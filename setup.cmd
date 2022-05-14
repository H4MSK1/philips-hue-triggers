$Action=New-ScheduledTaskAction -Execute "node /path/to/your/hue/script/dist/main.js --state=on"
$Trigger=New-ScheduledTaskTrigger -AtLogOn
$Set=New-ScheduledTaskSettingsSet
$Principal=New-ScheduledTaskPrincipal -UserID "$env:username" -LogonType Interactive -RunLevel Highest
$Task=New-ScheduledTask -Action $Action -Trigger $Trigger -Settings $Set -Principal $Principal
Register-ScheduledTask -TaskName PhilipsHueLightsOn -InputObject $Task

@REM @todo: setup scheduled task when locking the PC.