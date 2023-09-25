import json
import os
from flask_cors import *
from flask import Flask,render_template,request,Response,redirect,url_for,jsonify
import pymysql
from PIL import Image
import torch
import torchvision.transforms as transforms
import io
from flask import send_file
import numpy as np
import base64

#内网ip
app = Flask(__name__)

# URL路由

## 桉树林管理服务平台
# http://127.0.0.1:5000/桉树林管理服务平台
@app.route('/桉树林管理服务平台')
def Index():
    return render_template('桉树林管理服务平台.html')

## GIS专题图分析模块
# http://127.0.0.1:5000/GIS专题图分析模块
@app.route('/GIS专题图分析模块')
def GIS():
    return render_template('GIS专题图分析模块.html')

## 数据查询统计分析模块
# http://127.0.0.1:5000/数据查询统计分析模块
@app.route('/数据查询统计分析模块')
def Data():
    conn = pymysql.connect(host='127.0.0.1', user='root', password='331658260peko', db='anshu') #建立数据库连接
    cur = conn.cursor()

   # data1
    sql_name1 = ' SELECT model,score FROM aiscore'
    cur.execute(sql_name1)
    results1 = cur.fetchall()
   
    chart_data1 = [{'score': row[1], 'model': row[0]} for row in results1]

    cur.close()#关闭指针对象
    conn.close()#关闭连接对象
    return render_template('数据查询统计分析模块.html', chart_data1=chart_data1)

# http://127.0.0.1:5000/数据查询统计分析模块/图片数据库
@app.route('/数据查询统计分析模块/图片数据库')
def Img():
    return render_template('图片数据库.html')

# http://127.0.0.1:5000/数据查询统计分析模块/模型预测
@app.route('/数据查询统计分析模块/模型预测')
def index():
    return render_template('模型预测.html')

# Route to process the image and show the predicted result
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return "No image uploaded."

    image = request.files['image']
    if image.filename == '':
        return "No selected image."

    # Ensure 'uploads' folder exists
    if not os.path.exists('home/static/uploads'):
        os.makedirs('home/static/uploads')

    # Ensure 'output' folder exists
    if not os.path.exists('home/static/output'):
        os.makedirs('home/static/output')

    image_path = os.path.join('home/static/uploads', 'img.png')
    image.save(image_path)

    predictions = predict_image(image_path)
    colored_segmentation = create_colored_segmentation(predictions)

    output_path = os.path.join('home/static/output', 'output.png')
    save_colored_segmentation(colored_segmentation, output_path)

    return render_template('result.html', output_path=output_path)

# Load the TorchScript model
model = torch.jit.load('home/model/psp_model.pth')

# Define the class labels for your eight categories
class_labels = ['旱地', '水田', '林地', '园地', '农村道路','建设用地' ,'坑塘水面 ','沟渠']

# Preprocess the input image
def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    return transform(image).unsqueeze(0)

def predict_image(image_path):
    img = Image.open(image_path)
    img = preprocess_image(img)
    with torch.no_grad():
        output = model(img)
        predictions = output.argmax(1).squeeze().cpu().numpy()
    return predictions

    # Map class indices to colors (you can define your own color map)
class_colors = [
        [0, 0, 0],      # Class 0: '旱地'
        [0, 255, 0],    # Class 1: '水田'
        [0, 0, 255],    # Class 2: '林地'
        [255, 255, 0],  # Class 3: '园地'
        [255, 0, 0],    # Class 4: '农村道路'
        [128, 0, 128],  # Class 5: '建设用地'
        [0, 128, 128],  # Class 6: '坑塘水面'
        [128, 128, 0],  # Class 7: '沟渠'
    ]

def create_colored_segmentation(predictions):
    colored_segmentation = np.zeros((predictions.shape[0], predictions.shape[1], 3), dtype=np.uint8)
    for class_idx, color in enumerate(class_colors):
        colored_segmentation[predictions == class_idx] = color
    return colored_segmentation

def save_colored_segmentation(segmentation, output_path):
    segmented_image = Image.fromarray(segmentation)
    segmented_image.save(output_path)

if __name__ == "__main__":    
    """初始化,debug=True"""
    app.run(host='0.0.0.0', port=9000,debug=True)
# 这里host是网站ip，端口设为5000，开启debug模式（如果在真正上线的情况下可以去掉这个）

CORS(app, supports_credentials=True)
# 如果需要前后端分离或者在其他地方使用异步请求的时，需要加上这一行，解决跨域问题。


