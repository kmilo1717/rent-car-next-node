CREATE DATABASE alquilerdb;
USE alquilerdb;

-- Tabla CLIENTE
CREATE TABLE cliente (
    cedula VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono1 VARCHAR(15),
    telefono2 VARCHAR(15)
);

-- Tabla CARRO
CREATE TABLE carro (
    placa VARCHAR(20) PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    costo DECIMAL(15, 2) NOT NULL,
    disponible ENUM('SI', 'NO') NOT NULL
);

-- Tabla ALQUILER
CREATE TABLE alquiler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    tiempo_dias INT NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    saldo DECIMAL(12, 2) NOT NULL,
    abono_inicial DECIMAL(12, 2),
    devuelto ENUM('SI', 'NO') NOT NULL,
    cliente_cedula VARCHAR(20) NOT NULL,
    carro_placa VARCHAR(20) NOT NULL,
    FOREIGN KEY (cliente_cedula) REFERENCES cliente(cedula) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (carro_placa) REFERENCES carro(placa) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla PAGOS
CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    alquiler_id INT NOT NULL,
    FOREIGN KEY (alquiler_id) REFERENCES alquiler(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Seeds
INSERT INTO cliente (cedula, nombre, telefono1, telefono2) VALUES
('1234567890', 'Juan Pérez', '3001234567', '3101234567'),
('9876543210', 'Ana López', '3007654321', '3107654321'),
('1122334455', 'Carlos Gómez', '3001122334', '3101122334'),
('2233445566', 'María Rodríguez', '3002233445', '3102233445'),
('3344556677', 'Pedro Martínez', '3003344556', '3103344556'),
('4455667788', 'Laura Sánchez', '3004455667', '3104455667'),
('5566778899', 'Luis González', '3005566778', '3105566778'),
('6677889900', 'Carmen Díaz', '3006677889', '3106677889'),
('7788990011', 'Fernando Torres', '3007788990', '3107788990'),
('8899001122', 'Isabel Fernández', '3008899001', '3108899001');

INSERT INTO carro (placa, marca, modelo, costo, disponible) VALUES
('ABC123', 'Toyota', 'Corolla', 15000.00, 'SI'),
('DEF456', 'Honda', 'Civic', 16000.00, 'NO'),
('GHI789', 'Chevrolet', 'Aveo', 12000.00, 'SI'),
('JKL012', 'Ford', 'Focus', 14000.00, 'SI'),
('MNO345', 'BMW', 'Serie 3', 25000.00, 'NO'),
('PQR678', 'Audi', 'A4', 27000.00, 'SI'),
('STU901', 'Mercedes', 'Clase C', 35000.00, 'SI'),
('VWX234', 'Nissan', 'Altima', 18000.00, 'NO'),
('YZA567', 'Mazda', 'Mazda3', 22000.00, 'SI'),
('BCD890', 'Hyundai', 'Elantra', 19000.00, 'SI');

INSERT INTO alquiler (fecha, tiempo_dias, valor_total, saldo, abono_inicial, devuelto, cliente_cedula, carro_placa) VALUES
('2025-01-01 10:00:00', 5, 500.00, 400.00, 100.00, 'NO', '1234567890', 'ABC123'),
('2025-01-02 11:00:00', 3, 300.00, 200.00, 100.00, 'NO', '9876543210', 'DEF456'),
('2025-01-03 12:00:00', 7, 700.00, 600.00, 100.00, 'NO', '1122334455', 'GHI789'),
('2025-01-04 13:00:00', 4, 400.00, 300.00, 100.00, 'NO', '2233445566', 'JKL012'),
('2025-01-05 14:00:00', 6, 600.00, 500.00, 100.00, 'NO', '3344556677', 'MNO345'),
('2025-01-06 15:00:00', 2, 200.00, 100.00, 100.00, 'NO', '4455667788', 'PQR678'),
('2025-01-07 16:00:00', 8, 800.00, 700.00, 100.00, 'NO', '5566778899', 'STU901'),
('2025-01-08 17:00:00', 10, 1000.00, 900.00, 100.00, 'NO', '6677889900', 'VWX234'),
('2025-01-09 18:00:00', 9, 900.00, 800.00, 100.00, 'NO', '7788990011', 'YZA567'),
('2025-01-10 19:00:00', 5, 500.00, 400.00, 100.00, 'NO', '8899001122', 'BCD890');

INSERT INTO pagos (fecha, valor, alquiler_id) VALUES
('2025-01-02 10:00:00', 100.00, 1),
('2025-01-03 11:00:00', 100.00, 2),
('2025-01-04 12:00:00', 100.00, 3),
('2025-01-05 13:00:00', 100.00, 4),
('2025-01-06 14:00:00', 100.00, 5),
('2025-01-07 15:00:00', 100.00, 6),
('2025-01-08 16:00:00', 100.00, 7),
('2025-01-09 17:00:00', 100.00, 8),
('2025-01-10 18:00:00', 100.00, 9),
('2025-01-11 19:00:00', 100.00, 10);