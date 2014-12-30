package org.company.common.utils;

import java.awt.*;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

public class Browser {

    public static void openBrowser() {

        System.setProperty("java.awt.headless", "false");
        try {
            Desktop.getDesktop().browse(new URI("http://localhost:8080/common/html/index.html"));
            //Desktop.getDesktop().browse(new URI("http://localhost:8080"));
        } catch (IOException e) {
            e.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }
}
