BBB <-- USB --> Laptop <-- WiFi --> Internet
```
### Linux laptop
Configure host _(laptop running Ubuntu 17.10)_ to forward packets:
```
root@sp3:~# grep forward /etc/sysctl.conf
# Uncomment the next line to enable packet forwarding for IPv4
net.ipv4.ip_forward=1
# Uncomment the next line to enable packet forwarding for IPv6
net.ipv6.conf.all.forwarding=1
```
```root@sp3:~# cat /etc/sysctl.d/99-sysctl.conf |grep forward
# Uncomment the next line to enable packet forwarding for IPv4
net.ipv4.ip_forward=1
# Uncomment the next line to enable packet forwarding for IPv6
net.ipv6.conf.all.forwarding=1
```
Make sure forwarding is configured on the host (laptop):
```
root@sp3:~# sysctl -a |fgrep .forwarding |grep ^net |grep ipv4
net.ipv4.conf.all.forwarding = 1
net.ipv4.conf.default.forwarding = 1
net.ipv4.conf.enx1cba8c9bbeb5.forwarding = 1
net.ipv4.conf.enx1cba8c9bbeb8.forwarding = 1
net.ipv4.conf.lo.forwarding = 1
net.ipv4.conf.wlxe0b94db737c9.forwarding = 1
```
Interfaces on the host (laptop):
```
root@sp3:~# ifconfig 
enx1cba8c9bbeb5: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.7.1  netmask 255.255.255.252  broadcast 192.168.7.3
        inet6 fe80::8526:f82b:7c63:7b  prefixlen 64  scopeid 0x20<link>
        ether 1c:ba:8c:9b:be:b5  txqueuelen 1000  (Ethernet)
        RX packets 412  bytes 56069 (56.0 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 792  bytes 127857 (127.8 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

enx1cba8c9bbeb8: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        ether 1c:ba:8c:9b:be:b8  txqueuelen 1000  (Ethernet)
        RX packets 44  bytes 7080 (7.0 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 17445  bytes 1546254 (1.5 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 17445  bytes 1546254 (1.5 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlxe0b94db737c9: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.10.127  netmask 255.255.255.0  broadcast 192.168.10.255
        inet6 fe80::b222:eaea:cc17:a43  prefixlen 64  scopeid 0x20<link>
        inet6 fddb:9efd:dee8::2ca  prefixlen 128  scopeid 0x0<global>
        inet6 fddb:9efd:dee8:0:cce5:1a39:dfa0:e5ab  prefixlen 64  scopeid 0x0<global>
        inet6 2601:241:1:1fbc:54b7:ae3f:4842:3768  prefixlen 64  scopeid 0x0<global>
        inet6 2601:241:1:1fbc:9e38:bdef:c5f1:78ae  prefixlen 64  scopeid 0x0<global>
        inet6 fddb:9efd:dee8:0:54b7:ae3f:4842:3768  prefixlen 64  scopeid 0x0<global>
        ether e0:b9:4d:b7:37:c9  txqueuelen 1000  (Ethernet)
        RX packets 3345184  bytes 4635776508 (4.6 GB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1731919  bytes 265077619 (265.0 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```
Check that ufw (simple firewall utility on Ubuntu) is disabled:
```
root@sp3:~# ufw status
Status: inactive
```
Flush old rules from iptables (e.g. firewall):
```
root@sp3:~# sudo iptables -t nat -F
root@sp3:~# sudo iptables -t mangle -F
root@sp3:~# sudo iptables -F
root@sp3:~# sudo iptables -X
```
Add iptables firewall rules to forward traffic from the USB "Ethernet" interface (which is connected to the BeagleBone) to the WiFi interface:
```
root@sp3:~# iptables --table nat --append POSTROUTING --out-interface wlxe0b94db737c9 -j MASQUERADE
root@sp3:~# iptables --append FORWARD --in-interface enx1cba8c9bbeb5 -j ACCEPT
```
NOTE:
* Make sure wlxe0b94db737c9 matches the interface for WiFi interface on the laptop (which is connected to the Internet)
* Make sure enx1cba8c9bbeb5 matches the interface for the USB "Ethernet" interface.

Check firewall rules in iptables:
```
root@sp3:~# iptables -nL
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         
ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination    
```
### BeagleBone Black (rev C)
Interfaces on the BeagleBone Black:
```
debian@beaglebone:~$ ifconfig 
eth0: flags=-28669<UP,BROADCAST,MULTICAST,DYNAMIC>  mtu 1500
        ether 1c:ba:8c:9b:be:b4  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device interrupt 53  

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 7840  bytes 527520 (515.1 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 7840  bytes 527520 (515.1 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

usb0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.7.2  netmask 255.255.255.252  broadcast 192.168.7.3
        inet6 fe80::1eba:8cff:fe9b:beb6  prefixlen 64  scopeid 0x20<link>
        ether 1c:ba:8c:9b:be:b6  txqueuelen 1000  (Ethernet)
        RX packets 910  bytes 91945 (89.7 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 501  bytes 96039 (93.7 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

usb1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.6.2  netmask 255.255.255.252  broadcast 192.168.6.3
        inet6 fe80::1eba:8cff:fe9b:beb9  prefixlen 64  scopeid 0x20<link>
        ether 1c:ba:8c:9b:be:b9  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 44  bytes 7696 (7.5 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```
Add default route so that the BeagleBone tries to connect to the Internet through the laptop:
```
debian@beaglebone:~$ sudo route add default gw 192.168.7.1
```
NOTE: this should be the IP address of the laptop on the USB interface

Verify the routes:
```
debian@beaglebone:~$ netstat -rn
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         192.168.7.1     0.0.0.0         UG        0 0          0 usb0
192.168.6.0     0.0.0.0         255.255.255.252 U         0 0          0 usb1
192.168.7.0     0.0.0.0         255.255.255.252 U         0 0          0 usb0
```
Verify ping of Internet address works:
```
debian@beaglebone:~$ ping 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=120 time=11.4 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=120 time=12.0 ms
```
Add DNS server:
```
debian@beaglebone:~$ cat /etc/resolv.conf 
nameserver 8.8.8.8
```
Verify ping of an Internet hostname:
```
debian@beaglebone:~$ ping www.google.com
PING www.google.com (172.217.4.36) 56(84) bytes of data.
64 bytes from lga15s46-in-f36.1e100.net (172.217.4.36): icmp_seq=1 ttl=53 time=12.0 ms
64 bytes from lga15s46-in-f36.1e100.net (172.217.4.36): icmp_seq=2 ttl=53 time=10.4 ms
```




