

const AuthLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0" >
        {children}
    </main>
  );
}

export default AuthLayout