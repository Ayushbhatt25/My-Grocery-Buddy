from PIL import Image
import sys
import os

input_path = r"C:/Users/Lenovo/.gemini/antigravity/brain/f5bfd0d0-0402-45b6-b6d6-244429db206e/uploaded_image_1764403992571.png"
output_path = r"c:/Users/Lenovo/Desktop/THIRD SEM/My Grocery Buddy/client/src/assets/logo.png"

try:
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Change all white (also shades of whites) to transparent
        # Threshold of 220 to be safe
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print("Successfully saved transparent logo to", output_path)
except Exception as e:
    print("Error:", e)
    sys.exit(1)
