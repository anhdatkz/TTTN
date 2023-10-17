package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.entities.CTPN;
import com.example.entities.CTPNKeys;

@Repository
public interface CTPNRepository extends JpaRepository<CTPN, CTPNKeys>{
	@Query("select ctpn from CTPN ctpn where ctpn.id.mapnctpn = :mapn")
	public List<CTPN> getCTPNByMaPN(@Param("mapn") String mapn);
}
