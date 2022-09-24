# New Member Process

This is where new members can look to find information about the steps taken, as well as future plans, for the software onboarding process.

Currently the process for getting onboarded with avionics software will start with the following step: Get connected to the SRL vpn. In order to configure the vpn connection, a mac/linux user can go ahead and install OpenVPN on their own machine and reach out to @WinnieRegan on slack for the necessary files. If you use a windows machine, you can just go ahead and immediately reach out, and you'll get an installer that will set things up.

From there, members will have a virtual machine that they are welcome to use. Only windows users will necessarily need to ssh into this vm, as mac/linux users are welcome to just develop on their own local machine. We made this decision because the OpenSUSE vm will provide a more consistent and reliable environment, as opposed to WSL (Windows Subsystem for Linux). The commands to ssh are as follows:
    Windows: ssh -Y -C <identikey>@yonix.cusrl.dev
    Mac/Linux: ssh -X -C <identikey>@yonix.cusrl.dev
Reminder: In order for those commands to work, the SRL network needs to be able to recognize your machine, meaning you must be connected to the vpn.

With this completed, software members can clone the repo. If this is someone's first time connecting to github from their machine, which will be the case for anyone trying to clone into their vm, you will need to set up an ssh-key. To do so, open the settings in your github account and go to the "SSH and GPG keys" section. Click New SSH key, and call it something like Avionics_VM. From there, open your terminal and enter the following command:
    ssh-keygen -t rsa
Accept the default location path and empty password, and then nagivate to ~/.ssh
Inside this directory is your public key called id_rsa.pub. Copy the contents of this and paste it into the key section back in your github settings. Keeping it as an authentication key, you can now add the ssh key, and you will be able to clone the github repo onto your machine. The repo is pretty large, so it may take a little while. If it appears to get stuck, there is a chance that it glitched, in which case Ctrl-C out, and check on the status of the repo.

At this point, you are all set up and ready to start installing the f-prime tools. The steps for this will be laid out in the README of our github. The next couple software meetings for new software members will be dedicated to introducing some core fundamentals that you will need going forward, such as some basic terminal commands, usage of vim, basics of C++, intro to git, datasheets and registers, etc. From there, expect a more formal introduction to F', which once completed will allow us to transition into work sessions, as opposed to lecture-style meetings.

Note: For some useful links, check out devnotes.