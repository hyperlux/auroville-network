<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auroville Network Hub</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="d-flex flex-column min-vh-100">
<header>
    <nav class="navbar navbar-expand bg-dark navbar-dark">
        <a class="navbar-brand" href="/"><img src="https://directory.auroville.services/img/logo.png" width="32" height="32" alt="AV" />Auroville Network Hub</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="https://directory.auroville.services">Directory</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/reports">Reports</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/community">Community</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="https://directory.auroville.services/googleredirect"><i class="fas fa-sign-in-alt"></i> Login</a>
                </li>
            </ul>
        </div>
    </nav>
</header>

<div class="container mt-5">
    <h1>Welcome to the Auroville Network Hub</h1>
    <p>Your central hub for accessing important community information, tracking key metrics, and participating in decision-making processes.</p>
    <div class="row">
        <div class="col-md-4 mb-4">
            <div class="card">
                <div class="card-body text-center">
                    <h3 class="card-title">Directory</h3>
                    <p class="card-text">Find contact information for all residents and services.</p>
                    <a href="https://directory.auroville.services" class="btn btn-primary">Go to Directory</a>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-4">
            <div class="card">
                <div class="card-body text-center">
                    <h3 class="card-title">Reports</h3>
                    <p class="card-text">Access all mandates, policies, and guidelines.</p>
                    <a href="/reports" class="btn btn-primary">View Reports</a>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-4">
            <div class="card">
                <div class="card-body text-center">
                    <h3 class="card-title">Community</h3>
                    <p class="card-text">Engage with forums, voting tools, and upcoming events.</p>
                    <a href="/community" class="btn btn-primary">Join Community</a>
                </div>
            </div>
        </div>
    </div>

    <h2>Active Aurovilians</h2>
    <div class="box">
        <?php
        // Placeholder for fetching the number of active Aurovilians from the masterlist
        $activeAurovilians = 1234; // Replace this with actual data fetching code
        echo "<p>Number of Active Aurovilians: $activeAurovilians</p>";
        ?>
    </div>

    <h2>Access ACARAT Database Decisions</h2>
    <form action="decision.php" method="GET">
        <label for="decisionType">Select Decision Type:</label>
        <select id="decisionType" name="decisionType" class="form-control">
            <option value="decision">Decision</option>
            <option value="guideline">Guideline</option>
            <option value="mandate">Mandate</option>
            <option value="office_order">Office Order</option>
            <option value="order">Order</option>
            <option value="policy">Policy</option>
            <option value="regulation">Regulation</option>
            <option value="resolution">Resolution</option>
            <option value="rule">Rule</option>
            <option value="standing_order">Standing Order</option>
        </select>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
    </form>
</div>

<footer class="mt-auto">
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <a class="navbar-brand" href="about">About</a>
    </nav>
</footer>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
