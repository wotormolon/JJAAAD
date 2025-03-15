import subprocess
import sys
import importlib

def install(package):
    try:
        # Check if the package is already installed
        importlib.import_module(package)
        print(f"✔ {package} is already installed.")
    except ImportError:
        print(f"⚠ Installing {package}...")
        subprocess.run([sys.executable, "-m", "pip", "install", package], check=True)
        print(f"✅ {package} has been installed.")
