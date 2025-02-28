# Hyrax Integration with Nx VMS

This project integrates **Hyrax** with **Nx VMS** to enable real-time data visualization from the AI Manager's post-processor. For more details on how to add integrations to Nx VMS, refer to the official documentation: [Nx VMS Integration Guide](https://resources.vmsproxy.com/nx_6.0_help/managing-web-pages-and-integrations.html).

## Overview

The integration allows receiving data from the post-processor for the AI Manager (available here: [AI Manager Repository](https://github.com/BIshounen/sclbl-integration-sdk)) via **RabbitMQ** and visualizing it using **Rerun.io**.

- RabbitMQ reference: [RabbitMQ](https://www.rabbitmq.com/)
- Rerun.io reference: [Rerun.io](https://www.rerun.io/)
- Video guide: *NIKITA LINK NA VIDEO*

## Installation Guide

1. Install the AI Manager and post-processor following the instructions provided in their respective repositories.
2. Clone this repository and create a configuration file `config.py`, specifying the RabbitMQ address. See `config.py.example` for a reference.
3. Start the AI Manager and post-processor.
4. Run this integration service.
5. Add the integration to **Nx VMS** using the address where this service is running.

## Usage

1. Open the integration in **Nx VMS**.
2. A list of devices will be displayed.
3. If AI Manager with the post-processor is active for a device, its tile will be enabled.
   - Click on the active tile to open **Rerun.io**, displaying data from the processor.
   - Note: Activity is not detected automatically; refresh the page if the AI Manager was activated after loading.
4. You can open the corresponding camera layout directly from the tile to enable or disable AI Manager as needed.

---
