#!/bin/bash
#Writes the configuration file for hostapd
function writeHostapd {
echo "Writing Hostapd Configuration file..."

cat > /etc/hostapd/hostapd.conf <<EOM
interface=wlan0
driver=nl80211
channel=1
hw_mode=g
preamble=1
dtim_period=2
beacon_int=100
logger_syslog=-1
logger_syslog_level=2
logger_stdout=-1
logger_stdout_level=2
ctrl_interface=/var/run/hostapd
ctrl_interface_group=0
ssid=$1
max_num_sta=1 (only one STA available)
macaddr_acl=0
auth_algs=1
wme_enabled=0
eapol_key_index_workaround=0
eap_server=0
wpa=2
wpa_passphrase=$2
wpa_key_mgmt=WPA-PSK
wpa_pairwise=CCMP
EOM

echo "Write for Hostapd is completed."
}

#Writes the configuration file for Dnsmasq
function writeDnsmasq {
echo "Writing DNSMASQ Configuration file..."
cat >> /etc/dnsmasq.conf <<EOM
bind-interfaces
dhcp-range=192.168.1.2, 192.168.1.100
EOM

echo "Write for DNSMASQ completed."
}

#Does general configuration
function configure {
	echo "To configure the wifi, first answer a few questions."

	echo "This will be a WPA-PSK wifi port. What would be the SSID name for this hotspot?"
	read SSID
	echo "Alright your SSID will be : $SSID"

	echo "Awesome. Let's now set a 8 character password."
	read PASSWORD
	echo "Password is set to be : $PASSWORD"

	writeHostapd $SSID $PASSWORD

	writeDnsmasq
}

#Starts up the server and wifi
function start {
	echo "Starting up..."
	echo "Stopping NetworkManager..."
	service NetworkManager stop
	if [ $? != 0 ]
	then
		echo "Couldn't stop NetworkManager."
		exit 1
	fi

	echo "Configuring WiFi module operation mode..."
	modprobe -r dhd
	modprobe dhd op_mode=2
	if [ $? != 0 ]
	then
		echo "Couldn't configure DHD."
		exit 1
	fi

	echo "Configuring DNSMASQ..."
	dnsmasq -C /etc/dnsmasq.conf
	if [ $? != 0 ]
	then
		echo "Couldn't configure DNSMASQ."
		exit 1
	fi

	echo "Configuring driver & firmware files..."
	ifconfig wlan0 down
	echo "/etc/wifi/4354a1_apsta.bin" > /sys/module/dhd/parameters/firmware_path
	ifconfig wlan0 up
	ifconfig wlan0 down
	echo 2 > /sys/module/dhd/parameters/op_mode
	ifconfig wlan0 up
	echo "Configuration completed."

	echo "Starting Hostapd in the background..."
	hostapd /etc/hostapd/hostapd.conf -B

	echo "Setup all completed"
}

echo "Seems you want to start up your wifi hotspot and server on the Artik."
echo "Was this a mistake? Y/n"
read MISTAKE
if [ $MISTAKE != "Y" ]
then
echo "Cool. Do you want to configure the settings for your wifi hotspot? Y/n"
read HOTSPOT
	if [ $HOTSPOT == "Y" ]
	then
		configure
	fi
	start
fi
echo "Setup Exited"
exit 1
