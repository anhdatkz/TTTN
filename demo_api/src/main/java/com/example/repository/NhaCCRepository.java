package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entities.NhaCC;

@Repository
public interface NhaCCRepository extends JpaRepository<NhaCC, String>{

}
