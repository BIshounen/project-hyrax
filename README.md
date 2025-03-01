<p align="center">
   <img src="https://github.com/BIshounen/project-hyrax/blob/main/readme_images/hyrax.jpg?raw=true">
</p>

# Hyrax Integration with Nx VMS

Project Hyrax is a web-based integration with a server written on Python that collects and visualizes geographic data within the Network Optix Desktop client. This tool was developed for the Network Optix hackathon to demonstrate advanced capabilities in video analytics.

---
## Overview

The integration allows receiving data from the post-processor for the AI Manager (available here: [AI Manager Repository](https://github.com/BIshounen/sclbl-integration-sdk)) via **RabbitMQ** and visualizing it using **Rerun.io**.

- RabbitMQ reference: [RabbitMQ](https://www.rabbitmq.com/)
- Rerun.io reference: [Rerun.io](https://www.rerun.io/)
- Video guide: https://youtu.be/uEuA9EaeKI4
---
## Installation Guide

1. Install the AI Manager following the instructions on their portal: https://nx.docs.scailable.net/nx-ai-manager/get-started-with-the-nx-ai-manager-plugin
2. Build a postprocessor from its corresponding repository: https://github.com/BIshounen/sclbl-integration-sdk/tree/main/postprocessor-python-geoposition
3. Follow the postprocessor and AI Manager documentation to create a pipeline with the postprocesor
2. Clone this repository
3. Install all requirements using pip
3. Add a configuration file `config.py`, specifying the RabbitMQ server address, see `config.py.example` for a reference
3. Start the AI Manager and post-processor
4. Run this integration server
5. Add the integration to **Nx VMS** (Menu -> Add -> Integration), use the address where this service is running
6. [Optionally] You can use the video and model, trained for this video: https://drive.google.com/drive/folders/1AtHAhhmBaBLt_JgNWZVmKLsXTEzU28mh?usp=drive_link

---
## Usage

1. Open the integration in **Nx VMS** layout
2. A list of devices, available for the current user, will be displayed
3. If AI Manager with the post-processor is active for a device, its tile will be enabled
   - Click on the active tile to open **Rerun.io**, displaying data from the processor
   - Note: Activity is not detected automatically; refresh the page if the AI Manager was activated after the page was loaded
4. You can open the corresponding camera on the layout directly from the integration pressing on the button with the camera icon to manage the device, for example, enable or disable AI Manager

---

## Technical implementation

The project leverages several key components of the Network Optix ecosystem:

- **AI Manager** - For object detection and classification
- **Custom Post-Processor** - Converts bounding box coordinates to latitude/longitude
- **JavaScript API** - Manages devices and layout integration within the Nx Desktop client
- [**rerun.io**](http://rerun.io) - Provides the visualization layer for geographic data