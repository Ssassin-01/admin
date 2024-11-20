package com.ExQuizMe.admin.repository;

import com.ExQuizMe.admin.entity.VocabularyItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VocabularyItemRepository extends JpaRepository<VocabularyItem, Long> {
}