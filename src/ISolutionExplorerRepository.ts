import {IIdentity} from '@essential-projects/core_contracts';
import {IDiagram, ISolution} from '@process-engine/solutionexplorer.contracts';

export interface ISolutionExplorerRepository {

  /**
   * Opens the given pathspec with the identity. This method will ensure, that
   * the pathspec exists and is readable.
   *
   * @param pathspec The path specification to load.
   * @param identity The identity that is used to authorize, currently unused.
   */
  openPath(pathspec: string, identity: IIdentity): Promise<void>;

  /**
   * Gets all diagrams that are present in the loaded solution.
   *
   * @returns A promise, resolving to all diagrams in the loaded solution.
   */
  getDiagrams(): Promise<Array<IDiagram>>;

   /**
   * Get a single diagram from the current solution.
   *
   * @param diagramName The name of the diagram to load.
   * @returns A promise, resolving to the loaded diagram.
   */
  getDiagramByName(diagramName: string): Promise<IDiagram>;

  /**
   * Retrieve a single diagram from the given path.
   * It is used to open a BPMN file outside the context of a solution.
   *
   * @param pathToDiagram Full path to the diagram.
   * @returns A promise, resolving to the opened diagram.
   * @throws {ForbiddenError} When the server couldn't authorize the request
   * with given credentials.
   * @throws {UnauthorizedError} When there where no valid authentication
   * credentials.
   */
  openSingleDiagram(pathToDiagram: string, identity: IIdentity): Promise<IDiagram>;

  /**
   * Saves the given solution and all its diagrams. If a solution already
   * exists, it will be overriden.
   *
   * @param solution The solution to save.
   * @param pathspec The target pathspec.
   */
  saveSolution(solution: ISolution, pathspec?: string): Promise<void>;

  /**
   * Save a single diagram, if a diagram already exists, it will be overriden.
   *
   * @param diagram The diagram to save.
   * @param pathspec The target path for the save operation, defaults to the source
   *             of the diagram if omitted.
   */
  saveDiagram(diagramToSave: IDiagram, pathspec?: string): Promise<void>;
}
