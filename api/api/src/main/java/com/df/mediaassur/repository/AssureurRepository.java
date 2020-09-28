package com.df.mediaassur.repository;

import com.df.mediaassur.model.Assure;
import com.df.mediaassur.model.Assureur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */
@Repository
public interface AssureurRepository extends JpaRepository<Assureur, Integer> {
    //List<Assureur> findAllByOrderByIdDesc();
}
