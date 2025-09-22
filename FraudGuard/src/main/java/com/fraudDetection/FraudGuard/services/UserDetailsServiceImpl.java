package com.fraudDetection.FraudGuard.services;

import com.fraudDetection.FraudGuard.dto.AuthRequestDto;
import com.fraudDetection.FraudGuard.entities.User;
import com.fraudDetection.FraudGuard.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new UsernameNotFoundException("User not found: " + username);
        return new CustomUserDetails(user);

    }

    public Boolean signupUser(AuthRequestDto authRequestDto){
        if(userRepository.existsByUsername(authRequestDto.getUsername())){
            return false;
        }

        User newUser = User.builder()
                .username(authRequestDto.getUsername())
                .password(passwordEncoder.encode(authRequestDto.getPassword()))
                .accountNumber(UUID.randomUUID().toString())
                .role(com.fraudDetection.FraudGuard.entities.type.RoleType.USER)
                .build();

        userRepository.save(newUser);

        return true;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }



}
