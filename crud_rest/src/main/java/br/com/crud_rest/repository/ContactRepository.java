package br.com.crud_rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.crud_rest.model.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long>{}

//</contact,>

