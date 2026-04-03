# Interfacing with peripherals in ZephyrRTOS

Topics:
1. [GPIO Interface](#gpios)

## GPIOs

#### STEP 1: Setting up the devicetree:

In Zephyr RTOS, the easiest way to configure hardware interface with the gpio is to add the following to your `app.overlay` file

```
/ {
    ...other configs here...

    zephyr,user {
        your-gpios = <gpioa 1>;
    };
}

&gpioa {
    status = "okay";
}
```

This example would define GPIO A1. Setting `status = "okay"` tells Zephyr to enable GPIO bank A, and the `zephyr,user` code defines the specific GPIO that you want to access (bank A, pin 1). When you do this for your own code, talk to whoever designed the PCB to see what GPIO bank and pin you should use.

#### STEP 2: Access the device in your C/C++ code:

Then, in your code, you can access that node in the following way:

```c++
#include <zephyr/drivers/gpio.h>
#include <zephyr/logging/log.h>

LOG_MODULE_REGISTER(gpio_sample, LOG_LEVEL_INF);

// define the gpio device in your C/C++ file
#define USER_NODE DT_PATH(zephyr-user)
static const struct gpio_dt_spec your_gpio = GPIO_DT_SPEC_GET(USER_NODE, your-gpios);

int your_function() {
    //check if the gpio device is ready
    if (!gpio_is_ready_dt(&your_gpio)) {
        LOG_ERR("GPIO not ready");
    }

    //configure the gpio pin (in this case, it is output and active high)
    int ret = gpio_pin_configure_dt(&your_gpio, (GPIO_ACTIVE_HIGH | GPIO_OUTPUT));
    if (ret < 0) {
        // failed
        LOG_ERR("Failed to configure gpio: %d", ret);
    }

    // now that the gpio is initialized and configured, you can toggle it or set it arbitrarily!

    // toggle gpio:
    gpio_pin_toggle_dt(&your_gpio);

    // set gpio high:
    gpio_pin_set_dt(&your_gpio, 1);

    // set gpio low
    gpio_pin_set_dt(&your_gpio, 0);
}

