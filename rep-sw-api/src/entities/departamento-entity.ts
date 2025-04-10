import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
}
    from 'typeorm';
import UsuarioEntity from './usuario-entity';

@Entity({ name: 'departamento' })

class DepartamentoEntity {
    @PrimaryGeneratedColumn({ name: 'id_departamento' })
    id!: number;

    @Column({ name: 'nome', type: 'varchar', nullable: false })
    nome!: string;

    @OneToMany(() => UsuarioEntity, usuario => usuario.departamento, { nullable: true })
    usuarios?: UsuarioEntity[];
}

export default DepartamentoEntity;