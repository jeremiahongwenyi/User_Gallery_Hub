const setEnv = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
    
    const targetPath = './src/environments/environment.prod.ts';
    
    const envConfigFile = `export const environment = {
      production: true,
      apiUrl: '${process.env.API_URL}',
      authUrl: '${process.env.AUTH_URL}',
      firebaseConfig: {
        firebaseSignUpApi: '${process.env.FIREBASE_SIGNUP_API}',
        firebaseSignInApi: '${process.env.FIREBASE_SIGNIN_API}',
        firebaseApiKey: '${process.env.FIREBASE_API_KEY}',
        firebaseDatabaseURL: '${process.env.FIREBASE_DATABASE_URL}'
      }
    };
    `;
    
    writeFile(targetPath, envConfigFile, (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
    });
  };
  
  setEnv();