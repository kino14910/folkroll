---
title: 'TCL破解'
description: 'TCL电视安装当贝桌面和破解教程'
pubDate: 'Jan 29 2024'
---

#### TCL安装当贝桌面教程

TCL破解教程

https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=4070296&highlight=TCL



Platform Tools

https://developer.android.com/tools/releases/platform-tools



正常情况下只需要输入以下命令

```cmd
adb connect 192.168.x.xxx

adb shell

setprop persist.tcl.debug.installapk 1

setprop persist.tcl.installapk.enable 1
```

然后从U盘或者使用以下命令来安装

```cmd
adb connect 192.168.x.xxx

adb install dbzm_4.1.7_dangbei.apk
```



以下教程适用于安装当贝桌面时显示“当贝桌面已存在”、“安装异常”等情况强制安装



进入设置 > 系统 > 系统信息，遥控器依次按下“上”、“下”、“左”、“右”，即可看到页面中跳出adb开关，将ADB设为开启状态.

```cmd
adb connect 192.168.x.xxx

adb root

adb remount

adb shell

setprop persist.tcl.debug.installapk 1

setprop persist.tcl.installapk.enable 1

cd system/app

ls

//找到桌面文件，例如：TVLauncher.apk
//将当贝桌面拷入U盘，改为TVLauncher.apk

//创建备份
mkdir bak
cp -i TVLauncher.apk

//进入U盘目录
菜 /mnt/usb/sdal

cp -i TVLauncher.apk /system/app
```

重启电视