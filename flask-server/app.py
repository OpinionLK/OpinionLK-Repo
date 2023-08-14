import cv2 
import pytesseract
import PIL.Image
import os
import shutil
import pymongo

# Connect to MongoDB
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['document_scanner']
collection = db['documents']

cam = cv2.VideoCapture(0)

cv2.namedWindow("test")

# Read the image counter from a file or set it to 0
img_counter_file = "img_counter.txt"
if os.path.exists(img_counter_file):
    with open(img_counter_file, "r") as file:
        img_counter = int(file.read())
else:
    img_counter = 0

myconfig = r"--psm 3 --oem 3"

while True:
    ret, frame = cam.read()
    if not ret:
        print("Failed to grab frame")
        break
    cv2.imshow("test", frame)

    k = cv2.waitKey(1)
    if k % 256 == 27:
        print("Escape hit, closing...")
        break
    elif k % 256 == 32:
        img_name = "opencv_frame_{}.png".format(img_counter)
        cv2.imwrite(img_name, frame)
        print("{} written!".format(img_name))
        img_counter += 1

        text = pytesseract.image_to_string(PIL.Image.open(img_name), config=myconfig)
        print(text)

        # Store extracted_text in MongoDB
        document = {'content': text}
        inserted_document = collection.insert_one(document)
        print("Text sent to MongoDB with ID:", inserted_document.inserted_id)

        # Move the captured image to the "upload" folder
        upload_folder = "upload"
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        new_path = os.path.join(upload_folder, img_name)
        shutil.move(img_name, new_path)

        # Save the updated image counter to a file
        with open(img_counter_file, "w") as file:
            file.write(str(img_counter))

cam.release()
cv2.destroyAllWindows()
