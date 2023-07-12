package cl.grupouno.sprint6.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import cl.grupouno.sprint6.models.Usuario;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Long>{

}
