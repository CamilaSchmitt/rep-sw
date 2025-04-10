import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import UsuarioEntity from './usuario-entity';


@Entity({ name: 'jornada' })
class JornadaEntity {
    @PrimaryGeneratedColumn({ name: 'id_jornada' })
    id!: number;

    @Column({ name: 'horario_entrada', type: 'time', nullable: false })
    horario_entrada!: string;

    @Column({ name: 'horario_almoco_inicio', type: 'time', nullable: false })
    horario_almoco_inicio!: string;

    @Column({ name: 'horario_almoco_fim', type: 'time', nullable: false })
    horario_almoco_fim!: string;

    @Column({ name: 'horario_saida', type: 'time', nullable: false })
    horario_saida!: string;

    @Column({ name: 'dias_trabalho', type: 'varchar', nullable: false })
    dias_trabalho!: string; // Exemplo: 'Seg, Ter, Qua'

    @OneToMany(() => UsuarioEntity, usuario => usuario.jornada, { nullable: true })
    usuarios?: UsuarioEntity[];
}

export default JornadaEntity;