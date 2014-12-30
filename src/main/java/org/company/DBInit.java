package org.company;

/* Pragmatically populate the database */
public class DBInit {
    //Init DB
    public static void initDB() {
        //load test users in db
       /* ServiceUser serviceUser = ApplicationMain.context.getBean(ServiceUser.class);
        User user = new User();
        user.username = "test";
        user.password = "test";
        GrantedAuthorityRole grantedAuthorityRole = new GrantedAuthorityRole();
        grantedAuthorityRole.authority = "USER";
        user.refGrantedAuthorities.add(grantedAuthorityRole);
        serviceUser.save(user);

        //load integration data in db
        ServiceOneA serviceOneA = ApplicationMain.context.getBean(ServiceOneA.class);
        ServiceOneToManyA serviceOneToManyA = ApplicationMain.context.getBean(ServiceOneToManyA.class);
        OneToManyA oneToManyA = new OneToManyA();
        oneToManyA.setName("oneToManyA1");
        OneToManyB oneToManyB = new OneToManyB();
        oneToManyB.setName("oneToManyA1B1");
        oneToManyA.refOneToManyBs.add(oneToManyB);
        oneToManyB.refOneToManyA = oneToManyA;
        serviceOneToManyA.save(oneToManyA);*/

        /*for(int i = 0; i < 100; i++){
            OneA oneA = new OneA();
            oneA.setName("Name #" + i);
            serviceOneA.save(oneA);
        }*/
    }
}
