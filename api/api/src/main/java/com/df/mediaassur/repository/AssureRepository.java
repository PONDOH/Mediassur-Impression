package com.df.mediaassur.repository;

import com.df.mediaassur.model.Assure;
import com.df.mediaassur.model.Lot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */
@Repository
public interface AssureRepository extends JpaRepository<Assure, Integer> {
    //List<Assure> findAllByOrderByIdDesc();
}
