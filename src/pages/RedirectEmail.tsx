const RedirectEmail = () => {
  return <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-card rounded-lg shadow-lg border p-8 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2 text-center">
          Welcome to Omnira
        </h1>
        
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-6 text-center">
          Check Your Email
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 text-center">
          We've sent you an email with detailed instructions on the next steps.
        </p>
        
        <div className="bg-accent/50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            What to do next:
          </h3>
          
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span>Open your email inbox</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span>Look for an email from Ninu Digital  </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span>Follow the instructions in the email to complete your setup</span>
            </li>
          </ol>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          If you don't see the email within a few minutes, please check your spam folder.
        </p>
      </div>
    </div>;
};
export default RedirectEmail;