import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <div style="background-color: #002855; color: white; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; margin: 0; padding: 0;">
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 40px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); border: 1px solid #00b5e2;">
          <h1 style="color: #00b5e2; font-size: 3.5rem; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 2px;">Hola mUNDO docentes Dactic</h1>
          <p style="font-size: 1.8rem; margin: 0; font-weight: 300;">esta es mi primera app web</p>
          <div style="margin-top: 30px; font-size: 1rem; color: #a0c4ff;">
            #SomosOrgullosamenteUNI
          </div>
        </div>
      </div>
    `;
  }
}
