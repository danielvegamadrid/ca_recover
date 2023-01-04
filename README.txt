Generación JWT para pruebas Custom Application Santander:



1. Es necesario montar un Journey en MC para probar la Custom Application.
    - Tenemos un journey creado.

2. Custom:
    - Config.json: 
        . key y applicationExtensionKey: son los id del "Install packages" en MC.
        . configurationArguments: endpoints de la custom en GCP. Importante que el uso de JWT esté a true.
        . arguments. Importante que en "execute" también esté a true el uso de JWT.

    - index.html:
        . configuramos el fronta de la custom activity.

    - customActivity.js:
        - Método Initialize donde precargamos los datos en caso de que los haya.
        - Método Save donde montamos el payload antes de hacer el updateActivity.

3. GCP, proyecto Bmind-Sandbox 
    - Una vez tengamos el proyecto configurado tenemos que desplegarlo en GCP
    - Acceso: 
    - Tienes que estar asignado al proyecto bmind-sandbox.
    - Proyecto template: poc-custom.rar
    - Configurar proyecto: gcloud config set project bmind-sandbox
    - Ver el Log: gcloud app logs tail --service="santander-ca-minorista" --project="bmind-sandbox" . Es aquí donde capturaremos el jwt
    - Hacer un Deploy a GCP: gcloud app deploy --project="bmind-sandbox" desde el proyecto.





