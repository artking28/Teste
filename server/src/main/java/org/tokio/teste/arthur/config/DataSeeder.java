package org.tokio.teste.arthur.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.tokio.teste.arthur.domain.entity.City;
import org.tokio.teste.arthur.domain.entity.State;
import org.tokio.teste.arthur.repository.ICityRepository;
import org.tokio.teste.arthur.repository.IStateRepository;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedCities(ICityRepository cityRepo, IStateRepository stateRepo) {
        return args -> {
            if (cityRepo.count() == 0) {
                var input = getClass().getResourceAsStream("/cities.csv");
                assert input != null;

                Map<String, State> states = stateRepo.findAll().stream()
                        .collect(Collectors.toMap(State::getAcronym, s -> s));

                try (var reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8))) {
                    reader.readLine(); // pula cabeçalho

                    List<City> cities = new ArrayList<>();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        String[] parts = line.split(",");
                        if (parts.length < 4) continue;

                        String codigoIBGE = parts[1].trim();
                        String cityName = parts[2].trim();
                        String stateAcronym = parts[3].trim();

                        State state = states.get(stateAcronym);
                        if (state == null) continue;

                        City city = new City();
                        city.setName(cityName);
                        city.setCodigoIBGE(codigoIBGE);
                        city.setState(state);
                        cities.add(city);
                    }

                    cityRepo.saveAll(cities);
                }
            }
        };
    }

    @Bean
    CommandLineRunner seed(IStateRepository repo) {
        return args -> {
            if (repo.count() != 27) {
                repo.deleteAll();
                repo.saveAll(List.of(
                        new State("AC", "Acre"),
                        new State("AL", "Alagoas"),
                        new State("AP", "Amapá"),
                        new State("AM", "Amazonas"),
                        new State("BA", "Bahia"),
                        new State("CE", "Ceará"),
                        new State("DF", "Distrito Federal"),
                        new State("ES", "Espírito Santo"),
                        new State("GO", "Goiás"),
                        new State("MA", "Maranhão"),
                        new State("MT", "Mato Grosso"),
                        new State("MS", "Mato Grosso do Sul"),
                        new State("MG", "Minas Gerais"),
                        new State("PA", "Pará"),
                        new State("PB", "Paraíba"),
                        new State("PR", "Paraná"),
                        new State("PE", "Pernambuco"),
                        new State("PI", "Piauí"),
                        new State("RJ", "Rio de Janeiro"),
                        new State("RN", "Rio Grande do Norte"),
                        new State("RS", "Rio Grande do Sul"),
                        new State("RO", "Rondônia"),
                        new State("RR", "Roraima"),
                        new State("SC", "Santa Catarina"),
                        new State("SP", "São Paulo"),
                        new State("SE", "Sergipe"),
                        new State("TO", "Tocantins")
                ));
            }
        };
    }
}
