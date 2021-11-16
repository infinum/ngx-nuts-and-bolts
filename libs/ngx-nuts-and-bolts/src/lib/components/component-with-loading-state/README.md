# Component with loading state

## Features

`ComponentWithLoadingState` allows you to extend your application components with loading and error states.

Different enter and leave delay times allow for showing and hiding the loader only if the loading takes at least a certain amount of time. This provides a better UX where the user will not see a loading state if the loading takes very short time, preventing loading flashes.

When loading begins, any previous error is cleared, avoiding the need to handle clearing errors on retry manually. Similarly, when an error is set, loading state is cleared.

Accompanying loading and error observables is an observable for checking if the initial loading is done. This can be useful to show a different loading state on the initial load.

It usually makes sense to allow the user to retry on error. For this purpose, `ComponentWithLoadingState` exposes a loading trigger observable and a retry action handler.

## Configuration and usage

There are two ways to implement handling of error
