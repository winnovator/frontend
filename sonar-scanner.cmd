@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\sonarqube-scanner\dist\bin\sonar-scanner" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\sonarqube-scanner\dist\bin\sonar-scanner" %*
)