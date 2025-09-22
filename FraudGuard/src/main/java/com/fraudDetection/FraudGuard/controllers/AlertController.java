package com.fraudDetection.FraudGuard.controllers;

import com.fraudDetection.FraudGuard.dto.AlertsDto;
import com.fraudDetection.FraudGuard.entities.Alerts;
import com.fraudDetection.FraudGuard.repositories.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/alerts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AlertController {

    private final AlertRepository alertRepository;

    @GetMapping("/all")
    public ResponseEntity<List<AlertsDto>> getAllAlerts() {
        List<AlertsDto> alerts = alertRepository.findAll().stream()
                .map(alert -> AlertsDto.builder()
                        .id(alert.getId())
                        .transactionId(alert.getTransaction().getId())
                        .senderAccount(alert.getSenderAccount())
                        .receiverAccount(alert.getReceiverAccount())
                        .amount(alert.getAmount())
                        .status(alert.getStatus())
                        .createdAt(alert.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        Collections.reverse(alerts);
        return ResponseEntity.ok(alerts);
    }

}
