@echo off


set AUTH_CLIENT_SECRET=xT28Q~27vi0INgKTST4K.GZcH7FrqribgmmVBbBa
SET AZURE_OPENAI_ENDPOINT=https://foundrylab0803548625.openai.azure.com/
SET AZURE_OPENAI_KEY=Cj6Khthkf5cN5sj4i6ILy5fp2obCi9bMBjK4Cszc5WHZgafoNXylJQQJ99BDACMsfrFXJ3w3AAAAACOG2z59
SET AZURE_OPENAI_MAX_TOKENS= 8000
set AZURE_OPENAI_MODEL=gpt-4o-mini
set AZURE_OPENAI_MODEL_NAME=gpt-4o-mini
set AZURE_OPENAI_RESOURCE=foundrylab0803548625
set AZURE_OPENAI_SYSTEM_MESSAGE=eres un agente que recibe consultas, pide un documento adjunto y cuando te pasan el texto del documento haces un resumen del mismo
set AZURE_OPENAI_TEMPERATURE= 0.7
SET AZURE_OPENAI_TOP_P= 0.95
SET UI_FAVICON=https://www.bcu.gub.uy/_layouts/15/images/favicon.ico
SET UI_CHAT_DESCRIPTION=Asistente para consulta de documentos
SET UI_CHAT_TITLE=Asistente revisor de documentos
SET UI_TITLE=Asistente de documentos del bcu
set UI_LOGO=https://www.bcu.gub.uy/Style Library/Design_2016/img/logo.png
set UI_CHAT_LOGO=https://www.bcu.gub.uy/Style Library/Design_2016/img/logo.png



echo.
echo Restoring backend python packages
echo.
call python -m pip install -r requirements.txt
if "%errorlevel%" neq "0" (
    echo Failed to restore backend python packages
    exit /B %errorlevel%
)

echo.
echo Restoring frontend npm packages
echo.
cd frontend
call npm install
if "%errorlevel%" neq "0" (
    echo Failed to restore frontend npm packages
    exit /B %errorlevel%
)

echo.
echo Building frontend
echo.
call npm run build
if "%errorlevel%" neq "0" (
    echo Failed to build frontend
    exit /B %errorlevel%
)

echo.    
echo Starting backend    
echo.    
cd ..  
start http://127.0.0.1:50505
call python -m uvicorn app:app  --port 50505 --reload
if "%errorlevel%" neq "0" (    
    echo Failed to start backend    
    exit /B %errorlevel%    
) 
