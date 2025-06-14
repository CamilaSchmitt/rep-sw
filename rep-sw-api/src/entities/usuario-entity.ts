import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";
import { SituacaoUsuario } from "../enums/situacao-usuario.enum";

@Entity({ name: 'usuario' })
class UsuarioEntity {
    @PrimaryGeneratedColumn({ name: 'id_usuario' })
    id!: number;

    @Column({ name: 'nome', type: 'varchar', length: 100, nullable: false })
    nome!: string;

    @Column({ name: 'cpf', type: 'varchar', length: 11, unique: true, nullable: false })
    cpf!: string;

    @Column({
        name: 'situacao',
        type: 'enum',
        enum: SituacaoUsuario,
        enumName: 'situacao_usuario_enum',
        default: SituacaoUsuario.ATIVO,
        nullable: false
    })
    situacao!: SituacaoUsuario;

    @Column({ name: 'telefone', type: 'varchar', length: 15, nullable: false })
    telefone!: string;

    @Column({ name: 'email', type: 'varchar', length: 150, unique: true, nullable: false })
    email!: string;

    @Column({ name: 'senha', type: 'varchar', length: 255, nullable: false })
    senha!: string;

    @CreateDateColumn({ name: 'dt_criacao', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dtCriacao_Usuario!: Date;

    @CreateDateColumn({ name: 'dt_atualizacao', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dtAtualizacao_Usuario!: Date;

    @Column({ name: 'id_departamento', type: 'int', nullable: true })
    idDepartamento!: number;

    @Column({ name: 'id_jornada', type: 'int', nullable: true })
    idJornada!: number;
}

export default UsuarioEntity;
