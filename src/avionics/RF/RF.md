Here is the main page for the RF (Radio Frequency) subteam on avionics. The RF team is mainly responsible for enabling wireless communications between our avionics systems.

## What is RF?

Do you remember learning about Ohm's Law in your electronics classes? V=IR? Guess what––your professors lied to you! (sort of). In the RF world of high frequency signals, suddenly voltage is now also a function of position. If you could instantenously measure the voltage of a 2.4 GHz Wi-Fi signal at one point to be some positive voltage, a few centimeters away, you would measure 0 volts, and another few centimeters away, the voltage might be negative! All at the same point in time! With DC or low frequency AC signals (e.g. your 60 Hz 120 Vrms wall power), this isn't an issue, because the wavelength of light at 60Hz is almost 5000 km, or slightly over the distance from New York City to Los Angeles. So your instantenous voltage drop at different points in space is in the nanovolt range for practical circuits. In fact, the miniscule non-zero resistance of copper wire is far more significant than low frequency RF effects.

Nontheless, in general, you're in RF land once your longest wire/trace length is an appreciable fraction of the signal wavelength (roughly 10%). For reference, an 8 kHz audio signal has a wavelength of about 37 km, a 1700 kHz AM radio signal has a wavelength of about 175 m, a 99.9 MHz FM radio signal has a wavelength of about 3 m, and a 1575.42 MHz GPS signal has a wavelength of about 2 mm. Keep in mind, the wavelength of light is longest in a vacuum and decreases slightly through a medium such as copper or air.

![xkcd1457](https://imgs.xkcd.com/comics/feedback.png)

## Resources

Here are a list of resources that may be useful if you want to learn more about RF.

- [TI - RF Basics for Non-RF Engineers](https://www.ti.com/lit/ml/slap127/slap127.pdf)
- [RF Fundamentals](https://www.hwe.design/design-fundamentals/rf-basics/rf-fundamentals)
- [dB, Antenna Gain, Propagation, Attenuation, SNR, Sensitivity, ETC.](https://higherlogicdownload.s3.amazonaws.com/HPE/MigratedAttachments/C2402EC5-0E66-4CF4-ABE3-69EFA57AE547-1-RF-Basics_Part1.pdf)
- [Paper On Basics of RF Electronics](https://cds.cern.ch/record/1407402/files/p223.pdf)
- [ASEN3300 - Frequency Domain Circuits](RF_appnotesORresources/2021F-ASEN-3300-Lab04-Lecture-completed.pdf)
- [ASEN3300 - Wireless Communications](RF_appnotesORresources/ASEN3300_Lab10a_Wireless_Communications_ann.pdf)
- [ASEN3300 - Frequency Mixing](RF_appnotesORresources/ASEN3300_Lab10b_Frequency_Mixing_ann.pdf)
- [ASEN3300 - Amplitude Modulation](RF_appnotesORresources/ASEN3300_Lab10c_Amplitude_Modulation_ann.pdf)
- [ASEN3300 - Active Filters](RF_appnotesORresources/ASEN3300_Lab10d_Active_Filters_ann.pdf)
- [ASEN3300 - Frequency Modulation](RF_appnotesORresources/ASEN3300_Lab10e_Frequency_Modulation_ann.pdf)

Very much a work in progress...