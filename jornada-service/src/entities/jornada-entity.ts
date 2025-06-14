import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'jornada' })
class JornadaEntity {
    @PrimaryGeneratedColumn({ name: 'id_jornada' })
    id!: number;

    @Column({ name: 'horario_entrada', type: 'time', nullable: false })
    horarioEntrada!: string;

    @Column({ name: 'intervalo_inicio', type: 'time', nullable: false })
    intervaloInicio!: string;

    @Column({ name: 'intervalo_fim', type: 'time', nullable: false })
    intervaloFim!: string;

    @Column({ name: 'horario_saida', type: 'time', nullable: false })
    horarioSaida!: string;

    @Column({ type: 'text', array: true, nullable: false })
    diasTrabalho!: string[]; // Exemplo: ['Seg', 'Ter', 'Qua']
}

export default JornadaEntity;
