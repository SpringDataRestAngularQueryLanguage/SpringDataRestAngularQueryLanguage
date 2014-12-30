/*
package org.company.common.utils;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import static java.nio.charset.Charset.defaultCharset;

*/
/* This class shouldn't be taken seriously :) *//*



@Controller
@RequestMapping("/web")
public class WebFileSystem {

    public static boolean DEV_MODE = true;
    public static String SEPARATOR = DEV_MODE ? "\\" : "/";
    public static String ROOT_FOLDER = DEV_MODE ? "C:\\Users\\llunic\\Downloads\\projects"
                                                    + "\\angularspring\\src\\main\\resources\\"
                                                : "/";
    //TO DO In production the response should be cached, not read every time from Filesystem

    @RequestMapping(method = RequestMethod.GET, value = "/{actualFolder}.{extensionParam}")
    public @ResponseBody String getFile(@PathVariable String actualFolder, @PathVariable String extensionParam) {
        List<String> stringList = new ArrayList<String>();
        this.readRecursFilesInFolder(actualFolder, extensionParam, stringList);

        return stringListToOneSingeString(stringList);
    }

    private void readRecursFilesInFolder(String actualFolder, String extensionParam, List<String> stringList) {
        List<String> filesInFolder = getListOfFilesInFolder(actualFolder);
        List<String> foldersInFolder = getListOfSubFolders(actualFolder);
        List<String> filesInFolderFilteredByExtension = getFileListByExtension(filesInFolder, extensionParam);

        for(String pathToFile: filesInFolderFilteredByExtension) {
            List<String> fileLinesStringList = this.fileToStringListOfFileLines(ROOT_FOLDER +
                    actualFolder + SEPARATOR + pathToFile);
            stringList.addAll(fileLinesStringList);
        }

        for(String folder: foldersInFolder){
            this.readRecursFilesInFolder(actualFolder + SEPARATOR + folder, extensionParam, stringList);
        }
    }

    private List<String> getFileListByExtension(List<String> fileList, String extension){
        List<String> filesByExtension = new ArrayList<String>();
        for(String file : fileList){
            String[] fileNameAndExtension = file.split("\\.");
            if(fileNameAndExtension.length > 1 && fileNameAndExtension[1].equals(extension)){
                filesByExtension.add(file);
            }
        }

        return filesByExtension;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{folder}/{subFolder}/{file}.{extension}")
    public @ResponseBody String getFile(@PathVariable String folder,
                                        @PathVariable String subFolder,
                                        @PathVariable String file, @PathVariable String extension) {
        extension = ".".concat(extension);
        String path = ROOT_FOLDER + folder + SEPARATOR + subFolder + SEPARATOR + file + extension;
        List<String> stringList = fileToStringListOfFileLines(path);

        return stringListToOneSingeString(stringList);
    }


    @RequestMapping(method = RequestMethod.GET, value = "/{folder}/{subFolder0}/{subFolder1}/{file}.{extension}")
    public @ResponseBody String getFile(@PathVariable String folder,
                                        @PathVariable String subFolder0,
                                        @PathVariable String subFolder1,
                                        @PathVariable String file, @PathVariable String extension) {
        return this.getFile(folder, subFolder0 + SEPARATOR + subFolder1, file, extension);
    }


    public List<String> fileToStringListOfFileLines(String path){
        List<String> list = null;
        Path filePath = null;

        if(DEV_MODE){
            filePath = new File(path).toPath();
        }else {
            try {
                URI uri = WebFileSystem.class.getResource(path).toURI();
                filePath = new File(uri).toPath();
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
        }

        try {
            list = Files.readAllLines(filePath, defaultCharset());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return list;
    }


    public static String stringListToOneSingeString(List<String> stringList){
        StringBuffer stringBuffer = new StringBuffer();

        if(stringList == null){
            return "*/
/* Empty *//*
";
        }
        for (String string : stringList) {
            stringBuffer.append(string).append("\r\n");
        }

        return stringBuffer.toString();
    }


    public List<String> getListOfSubFolders(String folder){

        List<String> listOfSubFolders = new ArrayList<String>();
        String pathname = ROOT_FOLDER + folder;
        File file = this.getFileInDevOrPrdMode(pathname);
        String[] fileNames = file.list();

        for(String fileName : fileNames){
            String subFolderPath = pathname + SEPARATOR + fileName;
            File f = this.getFileInDevOrPrdMode(subFolderPath);
            if(f.isDirectory()){
                listOfSubFolders.add(fileName);
            }
        }

        return listOfSubFolders;
    }

    public List<String> getListOfFilesInFolder(String folder){

        List<String> listOfFilesInFolder = new ArrayList<String>();
        String pathname = ROOT_FOLDER + folder;
        File file = this.getFileInDevOrPrdMode(pathname);
        String[] fileNames = file.list();

        if(fileNames == null) return listOfFilesInFolder;

        for(String fileName : fileNames){
            String subFolderPath = pathname + SEPARATOR + fileName;
            File f = this.getFileInDevOrPrdMode(subFolderPath);
            if(f.isFile()){
                listOfFilesInFolder.add(fileName);
            }
        }

        return listOfFilesInFolder;
    }


    public File getFileInDevOrPrdMode(String pathname){
        File file = null;

        if(DEV_MODE){
            file = new File(pathname);
        }else {
            try {
                URL url = WebFileSystem.class.getResource(pathname);
                URI uri = url.toURI();
                file = new File(uri);
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
        }

        return file;
    }

}
*/
