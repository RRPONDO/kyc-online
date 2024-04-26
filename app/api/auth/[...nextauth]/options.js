import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/app/(models)/User";
import bcrypt from "bcrypt"

export const options = {
    providers: [
        GitHubProvider({
            profile(profile){
                console.log("Profile GitHub: ", profile)

                let userRole = "GitHub User"
                if(profile?.email == "rrpondo@gmail.com"){
                    userRole = "admin"
                }
                return{
                    ...profile,
                    role: userRole,
                };              
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_Secret
        }),

        GoogleProvider({
            profile(profile){
                console.log("Google GitHub: ", profile);
                let userRole = "Google User";

                return{
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };              
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_Secret
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                email:{
                    label:"Email",
                    type: "text",
                    placeholder: "your-email"
                },
                password:{
                    label:"Password",
                    type: "password",
                    placeholder: "your-password"
                },
            },
            async authorize(credentials){
                try {
                    const foundUser = await User.findOne({ email: credentials.email })
                        .lean()
                        .exec();

                    if (foundUser) {
                        console.log("User Exists");
                        const match = await bcrypt.compare(credentials.password,foundUser.password);

                        if (match) {
                            console.log("Good Password");
                            delete foundUser.password;

                            if(foundUser.email == "ronelle@admin.com"){
                                foundUser["role"] = "admin1";
                            }else if(foundUser.email == "tatenda@admin.com"){
                                foundUser["role"] = "admin2";
                            }else{
                                foundUser["role"] = "client";
                            }

                            
                            return foundUser;
                        }
                    }
                    
                } catch (error) {
                    console.log(error);
                }
                return null;
            },
        }),
    ],
    // pages: {
    //     signIn: "/Login",
    //   },
      secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt({token, user}){
            if(user) token.role = user.role; //add user role to the token
            return token;
        },
        async session({session, token}){
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },
};