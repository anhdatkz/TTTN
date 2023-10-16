package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.entities.CTGH;
import com.example.entities.CungCap;
import com.example.entities.CungCapKeys;

@Repository
public interface CungCapRepository extends JpaRepository<CungCap, CungCapKeys>{
	@Query("select cc from CungCap cc where cc.id.manhacccungcap = :manhacc")
	public List<CungCap> getCungCapByMaNhaCC(@Param("manhacc") String manhacc);
}
