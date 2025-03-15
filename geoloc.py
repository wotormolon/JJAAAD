from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS


def get_exif_data(image_path):
    #Extracts EXIF data from an image file.
    image = Image.open(image_path)
    exif_data = image._getexif()
    if not exif_data:
        return None
    return {TAGS.get(tag, tag): value for tag, value in exif_data.items()}

def get_gps_info(exif_data):
    #Extracts GPS coordinates from EXIF data.
    if "GPSInfo" not in exif_data:
        return None

    gps_info = exif_data["GPSInfo"]
    gps_data = {GPSTAGS.get(tag, tag): value for tag, value in gps_info.items()}

    def convert_to_degrees(value):
        #Converts GPS coordinates from degrees, minutes, seconds to decimal format.
        d, m, s = value
        return d + (m / 60.0) + (s / 3600.0)

    if "GPSLatitude" in gps_data and "GPSLongitude" in gps_data:
        lat = convert_to_degrees(gps_data["GPSLatitude"])
        lon = convert_to_degrees(gps_data["GPSLongitude"])

        #Adjust for N/S and E/W
        if gps_data.get("GPSLatitudeRef") == "S":
            lat = -lat
        if gps_data.get("GPSLongitudeRef") == "W":
            lon = -lon

        return {"latitude": lat, "longitude": lon}

    return None

# Example Usage
# Replace with your image path
image_path = "parking_sign.jpg"  
exif_data = get_exif_data(image_path)

if exif_data:
    gps_info = get_gps_info(exif_data)
    if gps_info:
        print("Extracted GPS Coordinates:", gps_info)
    else:
        print("No GPS data found in image.")
else:
    print("No EXIF metadata found in image.")
