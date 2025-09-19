# IoT Garden Simulation with micro:bit

In this project, you will learn about the Internet of Things (IoT) and how it can be used to control various devices in a garden using micro:bit code and a web simulation.

The goal of the simulation is to monitor and control devices such as a **light bulb**, **humidifier**, **water pump**, and **thermostat**. The micro:bit interacts with the simulation and allows you to adjust settings in real-time.

## Getting Started

### What You'll Need

* **micro:bit**
* **The web simulation interface** that shows the garden and devices (insert link here)
    * The web interface should be run in Chrome or Safari to connect the micro:bit
* **A computer or tablet** with Chrome or Edge

### Key Concepts

1. **Sensors and Devices**: You'll control four main devices in the garden:

   * **Light Bulb**: Controls the brightness of the light in the garden.
   * **Humidifier**: Turns the humidifier on or off to manage the moisture in the air.
   * **Water Pump**: Controls the flow of water to the plants.
   * **Thermostat**: Manages the temperature of the garden.

2. **Simulation**: You will monitor the conditions of the garden such as **light intensity**, **humidity**, **soil moisture**, and **temperature** in real-time. These values are shown in the simulation.

3. **Bluetooth Communication**: The micro:bit sends control commands via Bluetooth to adjust the devices in the garden.

## Simulation Blocks Overview

In the **MakeCode editor**, you have several custom blocks that help you interact with the simulation. These blocks are grouped in the `simulation` tab.

### 1. **Start Simulation**

* **Block Name**: `start simulation`
* **Purpose**: This block connects your micro:bit to the garden simulation over Bluetooth.
* **Usage**: Call this block in _on start_ to begin the connection.

### 2. **Use Default UI**

* **Block Name**: `useDefaultUi`
* **Purpose**: Initializes the user interface (UI) on the micro:bit, enabling interaction through buttons.
* **Usage**: Use this block in _on start_ to enable the UI for controlling devices.

### 3. **Sensor Readings**

These blocks provide real-time sensor values from the garden simulation:

* **Light Intensity**: Measures the amount of light in the garden (0-100).
* **Humidity**: Measures the air humidity (0-100).
* **Soil Moisture**: Measures how much moisture is in the soil (0-100).
* **Temperature**: Measures the temperature of the garden (0-100).

### 4. **Device Controls**

You can control the devices in the garden using these blocks:

* **Light Bulb**: Adjust the brightness of the light bulb (0-100).
* **Humidifier**: Turn the humidifier on or off (true/false).
* **Water Pump**: Turn the water pump on or off (true/false).
* **Thermostat**: Turn the thermostat on or off (true/false).

## Controlling the Garden

Once you've connected your micro\:bit to the simulation and initialized the UI, you can start controlling the devices:

### UI Interaction

* **Button A**: Move to the previous device or set the value to true.
* **Button B**: Move to the next device or set the value to false.
* **Button A + B**: Select button for selecting each device or selecting true/false.

The available modes are:

* **L**: Light Bulb (0/100) / Light Intensity (0-100)
* **H**: Humidifier (on/off) / Humidity (0-100)
* **M**: Water Pump (on/off) / Soil Moisture (0-100)
* **T**: Thermostat (on/off) / Temperature (0-100)

When you're in the **menu mode**, the micro\:bit will display the current device you're controlling (e.g., L, H, M, T). In the **action mode**, the micro\:bit will show whether the device is **on** (Yes) or **off** (No).

After turning each device on, conditions in the simulation will change
* **Light Bulb**: Increase the brightness by the set amount
* **Humidifier**: Gradually increase the humidity
* **Water Pump**: Gradually increase the soil moisture
* **Thermostat**: Gradually decrease the temperature

### Gathering sensor readings

1. Press **Button A** or **Button B** to scroll to the sensor you wish to read.
3. Shake the micro:bit to show a vertical bar graph representing the value for.

## Troubleshooting

If the simulation doesn't start or the micro:bit doesn't connect, check the following:

1. **Bluetooth Connection**: Make sure Bluetooth is enabled on your device and the micro:bit is connected.
2. **Microbit Connection**: Make sure your micro:bit is connected to your device using a micro-USB cable
2. **Simulation Started**: Ensure you've called the `start simulation` block to connect the micro:bit to the simulation.
3. **UI Active**: The micro:bit must be in UI mode for you to interact with the devices manually. Call the `use default ui` block to activate the UI.

Happy coding, and enjoy managing your virtual garden!
