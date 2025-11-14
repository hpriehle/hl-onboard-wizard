const AccountSetup = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-card rounded-lg shadow-lg border p-8 sm:p-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          We are setting up your account
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Check your email for next steps.
        </p>
      </div>
    </div>
  );
};

export default AccountSetup;
