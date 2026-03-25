
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `red_de_mascotas` DEFAULT CHARACTER SET utf8mb4 ;
USE `red_de_mascotas` ;

CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`categorias_foro` (
  `id_categoria` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `Tipo` ENUM('perro', 'gato') NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE INDEX `nombre_categoria_UNIQUE` (`nombre_categoria` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`especies` (
  `id_especie` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_especie` VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_especie`),
  UNIQUE INDEX `nombre_especie_UNIQUE` (`nombre_especie` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`estados_reporte` (
  `id_estado_reporte` INT(11) NOT NULL AUTO_INCREMENT,
  `estado` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id_estado_reporte`),
  UNIQUE INDEX `nombre_estado_UNIQUE` (`estado` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`tipos_evento` (
  `id_tipo_evento` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo` VARCHAR(100) NOT NULL,
  `descripcion` TEXT NOT NULL,
  PRIMARY KEY (`id_tipo_evento`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`roles` (
  `id_rol` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE INDEX `nombre_rol_UNIQUE` (`nombre_rol` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`usuarios` (
  `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(64) NULL DEFAULT NULL,
  `apellido` VARCHAR(100) NULL DEFAULT NULL,
  `correo` VARCHAR(100) NULL DEFAULT NULL,
  `contrasena` VARCHAR(64) NOT NULL,
  `telefono` VARCHAR(20) NULL DEFAULT NULL,
  `foto_perfil` VARCHAR(255) NULL DEFAULT 'Predeterminado.png',
  `descripcion` VARCHAR(500) NULL DEFAULT NULL,
  `fecha_registro` DATE NULL DEFAULT NULL,
  `estado` ENUM('Activo', 'Inactivo') NULL DEFAULT 'Activo',
  `rol_id` INT(11) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE,
  INDEX `fk_usuarios_rol_idx` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_rol`
    FOREIGN KEY (`rol_id`)
    REFERENCES `red_de_mascotas`.`roles` (`id_rol`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`eventos` (
  `id_evento` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `fecha_evento` DATE NOT NULL,
  `hora_evento` TIME NULL DEFAULT NULL,
  `foto_evento` VARCHAR(255) NULL DEFAULT NULL,
  `descripcion` TEXT NOT NULL,
  `ubicacion_longitud` FLOAT NOT NULL,
  `ubicacion_latitud` FLOAT NOT NULL,
  `ubicacion` VARCHAR(255) NOT NULL,
  `tipo_evento_id` INT(11) NOT NULL,
  `usuario_organizador_id` INT(11) NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NULL DEFAULT NULL,
  PRIMARY KEY (`id_evento`),
  INDEX `fk_eventos_tipo_idx` (`tipo_evento_id` ASC) VISIBLE,
  INDEX `fk_eventos_usuario_idx` (`usuario_organizador_id` ASC) VISIBLE,
  CONSTRAINT `fk_eventos_tipo`
    FOREIGN KEY (`tipo_evento_id`)
    REFERENCES `red_de_mascotas`.`tipos_evento` (`id_tipo_evento`),
  CONSTRAINT `fk_eventos_usuario`
    FOREIGN KEY (`usuario_organizador_id`)
    REFERENCES `red_de_mascotas`.`usuarios` (`id_usuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`foros` (
  `id_foro` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `contenido` TEXT NOT NULL,
  `fecha_creacion` DATE NOT NULL,
  `numero_comentarios` INT(11) NULL DEFAULT 0,
  `categoria_id` INT(11) NOT NULL,
  `usuario_id` INT(11) NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NOT NULL,
  `visibilidad` ENUM('publico', 'privado') NOT NULL DEFAULT 'publico',
  `imagen` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_foro`),
  INDEX `fk_foros_categoria_idx` (`categoria_id` ASC) VISIBLE,
  INDEX `fk_foros_usuario_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_foros_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `red_de_mascotas`.`categorias_foro` (`id_categoria`),
  CONSTRAINT `fk_foros_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `red_de_mascotas`.`usuarios` (`id_usuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`razas` (
  `id_raza` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_raza` VARCHAR(50) NOT NULL,
  `especie_id` INT(11) NOT NULL,
  PRIMARY KEY (`id_raza`),
  INDEX `fk_razas_especie_idx` (`especie_id` ASC) VISIBLE,
  CONSTRAINT `fk_razas_especie`
    FOREIGN KEY (`especie_id`)
    REFERENCES `red_de_mascotas`.`especies` (`id_especie`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`mascotas` (
  `id_mascota` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `genero` ENUM('macho', 'hembra') NULL DEFAULT NULL,
  `fecha_nacimiento` DATE NULL DEFAULT NULL,
  `peso_kg` DECIMAL(5,2) NULL DEFAULT NULL,
  `tamano` ENUM('pequeno', 'mediano', 'grande') NULL DEFAULT NULL,
  `esterilizado` TINYINT(1) NULL DEFAULT 0,
  `vacunas_al_dia` TINYINT(1) NULL DEFAULT 0,
  `notas_adicionales` TEXT NULL DEFAULT NULL,
  `foto` VARCHAR(255) NULL DEFAULT 'predeterminado.png',
  `estado_adopcion` TINYINT(1) NULL DEFAULT 0,
  `raza_id` INT(11) NOT NULL,
  PRIMARY KEY (`id_mascota`),
  INDEX `fk_mascotas_raza_idx` (`raza_id` ASC) VISIBLE,
  CONSTRAINT `fk_mascotas_raza`
    FOREIGN KEY (`raza_id`)
    REFERENCES `red_de_mascotas`.`razas` (`id_raza`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`participaciones_foro` (
  `id_participacion` INT(11) NOT NULL AUTO_INCREMENT,
  `foro_id` INT(11) NOT NULL,
  `usuario_id` INT(11) NOT NULL,
  `fecha_participacion` DATETIME NOT NULL,
  `comentario` TEXT NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NOT NULL,
  `participaciones_foro_id_participacion` INT(11) NOT NULL,
  PRIMARY KEY (`id_participacion`),
  INDEX `fk_pf_foro_idx` (`foro_id` ASC) VISIBLE,
  INDEX `fk_pf_usuario_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_participaciones_foro_participaciones_foro1_idx` (`participaciones_foro_id_participacion` ASC) VISIBLE,
  CONSTRAINT `fk_participaciones_foro_participaciones_foro1`
    FOREIGN KEY (`participaciones_foro_id_participacion`)
    REFERENCES `red_de_mascotas`.`participaciones_foro` (`id_participacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pf_foro`
    FOREIGN KEY (`foro_id`)
    REFERENCES `red_de_mascotas`.`foros` (`id_foro`),
  CONSTRAINT `fk_pf_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `red_de_mascotas`.`usuarios` (`id_usuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`tipos_reporte` (
  `id_tipo_reporte` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo` ENUM('Suplantacion de Identidad', 'Spam', 'Acoso', 'Contenido inapropiado', 'Mascota perdida') NOT NULL,
  `descripcion` TEXT NOT NULL,
  PRIMARY KEY (`id_tipo_reporte`),
  UNIQUE INDEX `nombre_tipo_UNIQUE` (`nombre_tipo` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;



CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`usuarios_mascotas` (
  `id_relacion` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` INT(11) NOT NULL,
  `mascota_id` INT(11) NOT NULL,
  `fecha_asignacion` DATE NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NOT NULL,
  `observaciones` TEXT NULL DEFAULT NULL,
  `dueño_anterior` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id_relacion`),
  UNIQUE INDEX `usuario_mascota_UNIQUE` (`usuario_id` ASC, `mascota_id` ASC) VISIBLE,
  INDEX `fk_um_usuario_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_um_mascota_idx` (`mascota_id` ASC) VISIBLE,
  INDEX `fk_usuarios_mascotas_usuarios1_idx` (`dueño_anterior` ASC) VISIBLE,
  CONSTRAINT `fk_um_mascota`
    FOREIGN KEY (`mascota_id`)
    REFERENCES `red_de_mascotas`.`mascotas` (`id_mascota`),
  CONSTRAINT `fk_um_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `red_de_mascotas`.`usuarios` (`id_usuario`),
  CONSTRAINT `fk_usuarios_mascotas_usuarios1`
    FOREIGN KEY (`dueño_anterior`)
    REFERENCES `red_de_mascotas`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `red_de_mascotas`.`reportes` (
  `id_reporte` INT(11) NOT NULL AUTO_INCREMENT,
  `descripcion` TEXT NOT NULL,
  `fecha_reporte` DATE NOT NULL,
  `foto_prueba` VARCHAR(255) NULL DEFAULT NULL,
  `ubicacion_longitud` FLOAT NOT NULL,
  `ubicacion_latitud` FLOAT NOT NULL,
  `ubicacion` VARCHAR(255) NOT NULL,
  `tipo_reporte_id` INT(11) NOT NULL,
  `estado_reporte_id` INT(11) NOT NULL,
  `usuarios_mascotas_id_relacion` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id_reporte`),
  INDEX `fk_reportes_tipo_idx` (`tipo_reporte_id` ASC) VISIBLE,
  INDEX `fk_reportes_estado_idx` (`estado_reporte_id` ASC) VISIBLE,
  INDEX `fk_reportes_usuarios_mascotas1_idx` (`usuarios_mascotas_id_relacion` ASC) VISIBLE,
  CONSTRAINT `fk_reportes_estado`
    FOREIGN KEY (`estado_reporte_id`)
    REFERENCES `red_de_mascotas`.`estados_reporte` (`id_estado_reporte`),
  CONSTRAINT `fk_reportes_tipo`
    FOREIGN KEY (`tipo_reporte_id`)
    REFERENCES `red_de_mascotas`.`tipos_reporte` (`id_tipo_reporte`),
  CONSTRAINT `fk_reportes_usuarios_mascotas1`
    FOREIGN KEY (`usuarios_mascotas_id_relacion`)
    REFERENCES `red_de_mascotas`.`usuarios_mascotas` (`id_relacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

 

INSERT INTO `categorias_foro` VALUES 
(1,'Perdidos','Mascotas reportadas como perdidas','perro'),
(2,'Cuidados','Consejos y cuidados para mascotas','gato'),
(3,'Entrenamiento','Tips de entrenamiento','perro'),
(4,'Salud','Cuida la salud de tu mascota','gato'),
(5,'Alimentación','Recomendaciones de comida saludable','gato'),
(6,'Comportamiento','Conductas de tu mascota','perro');
 

INSERT INTO `especies` VALUES 
(1,'Gato','Felino'),
(2,'Perro','Canino');
 

INSERT INTO `estados_reporte` VALUES 
(2,0),
(1,1);
 

INSERT INTO `eventos` VALUES 
(1,'Concurso Canino','2026-04-27','15:30:00','img/concurso','Competencia de habilidades',0,0,'Parque Deportivo',1,4,'Activo'),
(2,'Hora de esterilizar ya','2026-08-20','08:30:00','img/esterilizar','Campaña de esterilización',0,0,'Coliseo Vicentenario',5,2,'Activo'),
(3,'Cuidado animal','2026-05-17','14:00:00','img/charla','Conferencia sobre el cuidado animal',0,0,'NeoMundo',4,1,'Activo'),
(4,'Expo mascotas','2026-09-12','13:30:00','img/expo','Exhibicion d mascotas',0,0,'Cenfer',3,3,'Activo'),
(5,'Dona alimentos','2026-06-24','10:30:00','img/dona','Recolección de suplementos e alimentos',0,0,'Parque La Libertad',6,5,'Activo'),
(6,'Vacunas al dia','2026-05-29','10:00:00','img/vacuna','Vacunas gratuitas',0,0,'Cancha Municipal',2,3,'Activo');
 

INSERT INTO `foros` VALUES 
(1,'Perro perdido ','se perdió mi perro en el barrio centro ','2026-03-02',5,1,3,'Activo','publico','img/perdido '),
(2,'Gato agresivo ','Mi gato se comporta agresivo con otras personas ','2026-03-15',7,6,4,'Activo','publico','img/agresivo '),
(3,'Mejor comida para perros ','Que recomiendan para la comida de mi mascota ','2026-04-05',4,5,2,'Activo','publico','img/alimento '),
(4,'Consejos para bañar perro ','cada cuanto baño a mi perro?','2026-03-25',5,2,1,'Activo','publico','img/consejo '),
(5,'Entrenar cachorro ','tips para enseñar a mi cachorro ','2026-03-07',8,3,5,'Activo','publico','img/entrenamiento '),
(6,'Vacunas necesarias ','calendario de vacunas ','2026-03-06',4,4,3,'Activo','publico','img/vacunas ');
 

INSERT INTO `mascotas` VALUES 
(1,'Tom','macho','2025-01-03',11.40,'grande',1,1,'Tierno','predeterminado.png',1,1),
(2,'Sam','macho','2024-12-15',21.30,'mediano',0,0,NULL,'predeterminado.png',1,2),
(3,'Thor','macho','2024-08-08',2.70,'pequeno',1,1,'Muy cariñoso','predeterminado.png',1,3),
(4,'Kiara','hembra','2023-12-25',3.50,'mediano',1,0,'Jugeton','predeterminado.png',1,4),
(5,'luna','hembra','2024-03-09',3.20,'mediano',1,1,NULL,'predeterminado.png',1,5);
 

INSERT INTO `participaciones_foro` VALUES 
(1,1,3,'2026-03-01 00:00:00','Estoy intersado en adoptar ','Activo',1),
(2,1,4,'2026-03-01 00:00:00','que edad tiene el perro?','Activo',1),
(3,2,2,'2026-03-02 00:00:00','creo haber visto ese gato ','Activo',2),
(4,3,5,'2026-03-04 00:00:00','Tiene collar?','Activo',3),
(5,4,1,'2026-03-05 00:00:00','Yo lo baño cada 15 dias ','Activo',4),
(6,5,5,'2026-03-06 00:00:00','Recomiendo comida premium ','Activo',3);
 

INSERT INTO `razas` VALUES 
(1,'Pitbull',2),
(2,'Bulldog Frances',2),
(3,'Chihuhua',2),
(4,'Scottish Fold',1),
(5,'Abyssinian',1);
 

INSERT INTO `reportes` VALUES 
(1,'multiples mensajes inecesarios','2025-02-15',NULL,0,0,'',2,1,NULL),
(2,'robo de informacion para hacerse pasar por mi persona','2025-01-01',NULL,0,0,'',3,2,NULL),
(3,'Envia muchos mensajes sin necesidad','2025-03-11',NULL,0,0,'',2,1,NULL),
(4,'Mensajes inapropiados','2025-01-17',NULL,0,0,'',4,1,NULL),
(5,'Mascota perdida','2025-02-28',NULL,-73.1037,7.07643,'Barrio Villabel',5,2,1);

INSERT INTO `roles` VALUES 
(1,'Admin','administrador'),
(2,'Usuario','cliente de la app');
 

INSERT INTO `tipos_evento` VALUES 
(1,'Concurso','Competencias entre mascotas '),
(2,'Vacunación','Campañas de vacunacion para mascotas gratuitas'),
(3,'Exhibición','Exhibir mascotas'),
(4,'Charlas','Charlas e orientacion sobre cuidado animal'),
(5,'Esterilización','Campañas de esterilizacin gratuitas'),
(6,'Donación','Recoleccion de alimentos y suministros');
 

INSERT INTO `tipos_reporte` VALUES 
(1,'Acoso','En este reporte se debe reportar todas las acciones que atenten contra el espacio o privacidad de un usuario'),
(2,'Spam','Reportar todas aquellos comentarios repetitivos o multiple envios de un mensaje'),
(3,'Suplantacion de Identidad','Reportar aquellos usuario que se hacen pasar por otras personas'),
(4,'Contenido inapropiado','Repotar todos los mensajes que contengan imagenes o palabras vulgares o inapropiadas a la pagina'),
(5,'Mascota perdida','Reportar casos en los que se extravien mascotas');
 

INSERT INTO `usuarios` VALUES 
(1,'Mateo','García','mateo.garcia@email.com','MateoG#82!x','3102456789','/..',NULL,'2023-01-15','Activo',1),
(2,'Valentina','Rodríguez','valentina.rodriguez@email.com','ValeRdz@91*','3115892347','/..',NULL,'2022-11-08','Activo',2),
(3,'Santiago','Martínez','santiago.martinez@email.com','SantMart#77!','3127649085','/..',NULL,'2023-06-22','Activo',2),
(4,'Isabella','López','isabella.lopez@email.com','IsaLpz$64@','3134561209','/..',NULL,'2022-09-30','Activo',2),
(5,'Sofía','Hernández','sofia.hernandez@email.com','SofiHdz!23#','3148975632','/..',NULL,'2023-03-17','Activo',2);
 

INSERT INTO `usuarios_mascotas` VALUES 
(1,1,1,'2025-01-03','Activo',NULL,NULL),
(2,1,2,'2024-12-15','Activo',NULL,NULL),
(3,3,3,'2024-08-08','Activo',NULL,NULL),
(4,4,4,'2023-12-25','Activo',NULL,NULL),
(5,5,5,'2024-03-09','Activo',NULL,NULL);

/* Sentencias Sql */

/* foros */

select f.* from foros as f inner join categorias_foro as cf on categoria_id = id_categoria  where id_categoria in (select id_categoria from categorias_foro where tipo = 1)  ;

select f.* from foros as f inner join categorias_foro as cf on categoria_id = id_categoria  where id_categoria = 2  ;

select pf.*, u.nombre, u.apellido from participaciones_foro as pf inner join usuarios as u on usuario_id = id_usuario where foro_id = (select id_foro from foros where id_foro = 1) order by fecha_participacion desc;


/* perfil usuario */


select * from usuarios;

select * from usuarios;

select m.nombre, e.nombre_especie, m.estado_adopcion from usuarios as u 
join usuarios_mascotas as um on id_usuario = usuario_id 
join mascotas as m on id_mascota = mascota_id 
join razas as r on id_raza = raza_id 
join especies as e on id_especie = especie_id where id_usuario = 1 and nombre_especie = 'Perro';

/* Agregare Nueva Mascota */

insert into mascotas (nombre,fecha_nacimiento,tamaño,peso,esterilizado,vacunado,genero) values (Kira,2024-12-25,1,4,1,1,2);

insert into raza (nombre_raza) values (Pincher);

insert into especie (nombre_especie) values (1);

update usuarios set nombre = 'Michael', apellido = 'Bautista', telefono = '3138456187', correo = 'bmaicolsantiago@gmail.com' where id_usuario = 1;

select m.nombre, e.nombre_especie, r.raza_nombre, m.fecha_nacimiento, m.genero, m.peso, m.esterilizado, m.vacunado from usuarios as u 
join usuarios_mascotas as um on id_usuario = usuario_id 
join mascotas as m on id_mascota = mascota_id 
join razas as r on id_raza = raza_id 
join especies as e on id_especie = especie_id where id_usuario = 1;

select count(id_mascotas) from usuarios as u 
join usuarios_mascotas as um on id_usuario = usuario_id 
join mascotas as m on id_mascota = mascota_id 
join razas as r on id_raza = raza_id 
join especies as e on id_especie = especie_id where id_usuario = 1;

select count(id_mascotas) from usuarios as u 
join usuarios_mascotas as um on id_usuario = usuario_id 
join mascotas as m on id_mascota = mascota_id 
join razas as r on id_raza = raza_id 
join especies as e on id_especie = especie_id where id_usuario = 1 and nombre_especie = 'Perro';

select count(id_mascotas) from usuarios as u 
join usuarios_mascotas as um on id_usuario = usuario_id 
join mascotas as m on id_mascota = mascota_id 
join razas as r on id_raza = raza_id 
join especies as e on id_especie = especie_id where id_usuario = 1 and nombre_especie = 'Gato';


