package cl.grupouno.sprint6.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.grupouno.sprint6.models.Usuario;
import cl.grupouno.sprint6.repositories.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;

	
	/**
	 * Método que enlaza la capa de repositorio con
	 * la capa de controllers para crear un registro
	 * en la base de datos.
	 * @param u representa un usuario
	 * @return el usuario creado en la base de datos
	 */
	public Usuario create(Usuario u) {
		return usuarioRepository.save(u);
	}
	
	/**
	 * Método que enlaza la capa de repositorio con
	 * la capa de controllers para obtener un registro
	 * de la base de datos.
	 * @param id El id del usuario a buscar
	 * @return el registro encontrado o null
	 */
	public Usuario read(Long id) {
		Optional <Usuario> usuarioBd = usuarioRepository.findById(id);
		
		if (usuarioBd.isPresent()) return usuarioBd.get();			
		
		return null;
	}
	
	/**
	 * Método que enlaza la capa de repositorio con
	 * la capa de controllers para obtener todos los
	 * registro de la base de datos.
	 * @return listado con usuarios
	 */
	public List<Usuario> readAll() {
		return (List<Usuario>) usuarioRepository.findAll();
	}
	
	/**
	 * Método que enlaza la capa de repositorio con 
	 * la capa de controllerse para modificar un 
	 * registro en la base de datos
	 * @param u Los campos modificados del registro
	 * @param id El id del registro a modificar
	 * @return el registro modificado
	 */
	public Usuario put(Usuario u, Long id) {
		Optional<Usuario> optionalU = usuarioRepository.findById(id);
		
		if (optionalU.isPresent()) {
			Usuario bdU = optionalU.get();
			bdU.setNombres(u.getNombres() != null ? u.getNombres() : bdU.getNombres());
			bdU.setApellidos(u.getApellidos() != null ? u.getApellidos() : bdU.getApellidos());
			bdU.setRut(u.getRut() != null ? u.getRut() : bdU.getRut());
			bdU.setCargo(u.getCargo() != null ? u.getCargo() : bdU.getCargo());
			
			return usuarioRepository.save(bdU);
		}

		return null;
	}
	
	/**
	 * Método que enlaza la capa de repositorio con 
	 * la capa de controllers para eliminar un registro
	 * de la base de datos. Este método no retorna nada.
	 * @param id El id del usuario a eliminar.
	 */
	public void delete(Long id) {
		usuarioRepository.deleteById(id);
	}
}
