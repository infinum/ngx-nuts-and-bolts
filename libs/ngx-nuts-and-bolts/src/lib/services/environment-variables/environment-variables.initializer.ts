import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IEnvironmentVariablesLoader } from './environment-variables-loader.interface';
import { EnvironmentVariablesService } from './environment-variables.service';

export function environmentVariablesInitializer<TVariable extends string>(
	environmentVariablesService: EnvironmentVariablesService<TVariable>,
	loader: IEnvironmentVariablesLoader<TVariable>
): () => Observable<unknown> | Promise<unknown> | void {
	return () => {
		const loadResult = loader.load(); // eslint-disable-line rxjs/finnish

		if (loadResult instanceof Observable) {
			return loadResult.pipe(
				tap((variables) => {
					environmentVariablesService.init(variables);
				})
			);
		}

		environmentVariablesService.init(loadResult);
		return Promise.resolve();
	};
}
