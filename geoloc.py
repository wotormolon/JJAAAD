from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

def get_exif_data(image_path):
    """Extracts EXIF data from an image file."""
    try:
        image = Image.open(image_path)
        exif_data = image._getexif()
        if not exif_data:
            return None
        return {TAGS.get(tag, tag): value for tag, value in exif_data.items()}
    except Exception as e:
        print(f"Error extracting EXIF data: {e}")
        return None

def get_gps_info(exif_data):
    """Extracts GPS coordinates from EXIF data."""
    if not exif_data or "GPSInfo" not in exif_data:
        return None

    gps_info = exif_data["GPSInfo"]
    gps_data = {GPSTAGS.get(tag, tag): value for tag, value in gps_info.items()}

    def convert_to_degrees(value):
        """Converts GPS coordinates from degrees, minutes, seconds to decimal format."""
        d, m, s = value
        return d + (m / 60.0) + (s / 3600.0)

    if "GPSLatitude" in gps_data and "GPSLongitude" in gps_data:
        lat = convert_to_degrees(gps_data["GPSLatitude"])
        lon = convert_to_degrees(gps_data["GPSLongitude"])

        # Adjust for N/S and E/W
        if gps_data.get("GPSLatitudeRef") == "S":
            lat = -lat
        if gps_data.get("GPSLongitudeRef") == "W":
            lon = -lon

        return {"latitude": lat, "longitude": lon}

    return None
