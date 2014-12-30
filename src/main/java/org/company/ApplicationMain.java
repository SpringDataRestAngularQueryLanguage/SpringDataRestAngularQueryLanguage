package org.company;

import org.company.common.config.RepositoryRestMvcConfigurationWithJSONid;
import org.company.common.config.SecurityConfig;
import org.company.common.config.WebMvcConfiguration;
import org.company.common.utils.Browser;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableAutoConfiguration
@EnableJpaRepositories
@ComponentScan(basePackages = {"org.company"})
@Import({RepositoryRestMvcConfigurationWithJSONid.class, SecurityConfig.class, WebMvcConfiguration.class})
@PropertySource("application.properties")
public class ApplicationMain extends SpringBootServletInitializer {

    public static ConfigurableApplicationContext context;

    public static void main(String[] args) {
        SecurityConfig.disableSecurity = true;
        context = SpringApplication.run(ApplicationMain.class, args);
        DBInit.initDB();
        Browser.openBrowser();
    }


    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ApplicationMain.class);
    }

}