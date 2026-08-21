@echo off
rem Opens the Minecraft mods folder in File Explorer.
if not exist "%APPDATA%\.minecraft\mods" mkdir "%APPDATA%\.minecraft\mods"
explorer "%APPDATA%\.minecraft\mods"
