import { Robot } from './robot.class';

describe('Pruebas de la clase Robot', () => {
  it('Debe asignarse al propietario', () => {
    let myRobot = new Robot('Goku');

    expect(myRobot.propietario).toBe('Goku');
  });

  it('La bateria debe estar al 100 al crear un robot', () => {
    let myRobot = new Robot('Goku');
    expect(myRobot.bateria).toBeGreaterThanOrEqual(100);
  });

  it('encender() debe saludar al propietario, disminuir la bateria en 10 y establecer encendido en true', () => {
    let myRobot = new Robot('Goku');
    const spyOnConsoleLog = spyOn(console, 'log');
    myRobot.encender();
    expect(spyOnConsoleLog).toHaveBeenCalledOnceWith('¡Hola, Goku!');
    expect(myRobot.bateria).toBe(90);
    expect(myRobot.encendido).toBeTrue();
  });

  it(`Las acciones del robot debe contener 'limpia', 'compra', 'vigila'`, () => {
    let myRobot = new Robot('Goku');
    // expect(myRobot.acciones).toEqual(['limpia', 'compra', 'vigila']);
    expect(myRobot.acciones).toContain('limpia');
    expect(myRobot.acciones).toContain('compra');
    expect(myRobot.acciones).toContain('vigila');
  });
});
